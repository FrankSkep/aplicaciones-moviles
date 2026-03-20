import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const openDb = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('mydatabase.db');
    }
    return db;
};

export interface Nota {
    id: number;
    titulo: string;
    contenido: string;
    usuario_id?: number;
    created_at: string;
}

// create note
export const createNota = async (titulo: string, contenido: string, usuario_id: number): Promise<any> => {
    const database = await openDb();
    const statement = await database.prepareAsync('INSERT INTO notas (titulo, contenido, usuario_id) VALUES ($titulo, $contenido, $usuario_id)');
    return await statement.executeAsync({
        $titulo: titulo,
        $contenido: contenido,
        $usuario_id: usuario_id
    });
};

// get all notes
export const getNotas = async (): Promise<Nota[]> => {
    const database = await openDb();
    return await database.getAllAsync<Nota>('SELECT * FROM notas ORDER BY created_at DESC');
};

// get notes by user
export const getNotasByUsuario = async (usuario_id: number): Promise<Nota[]> => {
    const database = await openDb();
    return await database.getAllAsync<Nota>('SELECT * FROM notas WHERE usuario_id = $usuario_id ORDER BY created_at DESC', {
        $usuario_id: usuario_id
    });
};

// get note by id
export const getNotaById = async (id: number) => {
    const database = await openDb();
    return await database.getFirstAsync<Nota>(
        'SELECT * FROM notas WHERE id = ?',
        [id]
    );
};

// update note
export const updateNota = async (id: number, titulo: string, contenido: string) => {
    const database = await openDb();
    const statement = await database.prepareAsync('UPDATE notas SET titulo = $titulo, contenido = $contenido WHERE id = $id');
    return await statement.executeAsync({
        $titulo: titulo,
        $contenido: contenido,
        $id: id
    });
};

// delete note
export const deleteNota = async (id: number) => {
    const database = await openDb();
    const statement = await database.prepareAsync('DELETE FROM notas WHERE id = $id');
    return await statement.executeAsync({
        $id: id
    });
};
