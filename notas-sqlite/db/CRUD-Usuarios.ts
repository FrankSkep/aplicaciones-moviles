import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const openDb = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('mydatabase.db');
    }
    return db;
};

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    telefono?: string;
    created_at?: string;
}

// create
export const createUsuario = async (nombre: string, email: string, telefono: string): Promise<any> => {
    const database = await openDb();
    const statement = await database.prepareAsync('INSERT INTO usuarios (nombre, email, telefono) VALUES ($nombre, $email, $telefono)');
    return await statement.executeAsync({
        $nombre: nombre,
        $email: email,
        $telefono: telefono
    });
};

// get all
export const getUsuarios = async (): Promise<Usuario[]> => {
    const database = await openDb();
    return await database.getAllAsync<Usuario>('SELECT * FROM usuarios ORDER BY id DESC');
};

// get by id
export const getUsuarioById = async (id: number) => {
    const database = await openDb();
    return await database.getFirstAsync<Usuario>(
        'SELECT * FROM usuarios WHERE id = ?',
        [id]
    );    
};

// update usuario
export const updateUsuario = async (id: number, nombre: string, email: string, telefono: string) => {
    const database = await openDb();
    const statement = await database.prepareAsync(`UPDATE usuarios SET nombre = $nombre, email = $email, telefono = $telefono WHERE id = $id`);
    return await statement.executeAsync({
        $nombre: nombre,
        $email: email,
        $telefono: telefono,
        $id: id
    });
}

// delete usuario
export const deleteUsuario = async (id: number) => {
    const database = await openDb();
    const statement = await database.prepareAsync('DELETE FROM usuarios WHERE id = $id');
    return await statement.executeAsync({
        $id: id
    });
}