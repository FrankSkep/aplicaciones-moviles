// data/newsData.ts
import { Category, CategoryType, News } from '../types';

export const categories: Category[] = [
    {
        id: '1',
        name: 'Todas',
        icon: 'globe',
        color: '#6366F1',
        gradient: ['#6366F1', '#8B5CF6'],
    },
    {
        id: '2',
        name: 'Tecnología',
        icon: 'cpu',
        color: '#3B82F6',
        gradient: ['#3B82F6', '#2563EB'],
    },
    {
        id: '3',
        name: 'Deportes',
        icon: 'sportscourt.fill',
        color: '#10B981',
        gradient: ['#10B981', '#059669'],
    },
    {
        id: '4',
        name: 'Entretenimiento',
        icon: 'play.tv.fill',
        color: '#EC4899',
        gradient: ['#EC4899', '#DB2777'],
    },
    {
        id: '5',
        name: 'Ciencia',
        icon: 'atom',
        color: '#8B5CF6',
        gradient: ['#8B5CF6', '#7C3AED'],
    },
    {
        id: '6',
        name: 'Salud',
        icon: 'heart.fill',
        color: '#14B8A6',
        gradient: ['#14B8A6', '#0D9488'],
    },
    {
        id: '7',
        name: 'Política',
        icon: 'building.columns.fill',
        color: '#F59E0B',
        gradient: ['#F59E0B', '#D97706'],
    },
    {
        id: '8',
        name: 'Economía',
        icon: 'chart.bar.fill',
        color: '#EF4444',
        gradient: ['#EF4444', '#DC2626'],
    },
];

export const newsData: News[] = [
    {
        id: '1',
        title: 'Claude 4 supera todas las expectativas en razonamiento avanzado',
        description:
            'Anthropic lanza su modelo más poderoso con capacidades nunca antes vistas en procesamiento contextual, análisis de código y creatividad asistida.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        category: 'Tecnología',
        categoryColor: '#3B82F6',
        author: 'Sofía Chen',
        date: '2026-02-07T09:15:00',
        views: '45.2k',
        readTime: 8,
        tags: ['IA', 'Anthropic', 'Claude', 'Machine Learning'],
        featured: true,
        breaking: true,
    },
    {
        id: '2',
        title: 'Argentina derrota a Brasil 3-2 en el clásico sudamericano',
        description:
            'En un partido electrizante, la albiceleste remonta en los últimos 15 minutos con dos goles de Julián Álvarez que enloquecieron el estadio.',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
        category: 'Deportes',
        categoryColor: '#10B981',
        author: 'Martín Rodríguez',
        date: '2026-02-07T06:30:00',
        views: '128.7k',
        readTime: 5,
        tags: ['Fútbol', 'Argentina', 'Brasil', 'Sudamérica'],
        breaking: true,
    },
    {
        id: '3',
        title: '"El Silencio de las Estrellas" arrasa en los premios del cine',
        description:
            'La cinta de ciencia ficción dirigida por Denis Villeneuve obtiene 11 nominaciones incluyendo mejor película, director y efectos visuales.',
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
        category: 'Entretenimiento',
        categoryColor: '#EC4899',
        author: 'Isabella Rossi',
        date: '2026-02-06T22:45:00',
        views: '67.3k',
        readTime: 6,
        tags: ['Cine', 'Premios', 'Sci-Fi', 'Hollywood'],
        featured: true,
    },
    {
        id: '4',
        title: 'Telescopio James Webb detecta señales inusuales de exoplaneta K2-18b',
        description:
            'Los científicos encuentran biomarcadores que podrían indicar vida microbiana en la atmósfera de este mundo oceánico a 120 años luz.',
        image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
        category: 'Ciencia',
        categoryColor: '#8B5CF6',
        author: 'Dr. James Peterson',
        date: '2026-02-06T18:20:00',
        views: '92.1k',
        readTime: 12,
        tags: ['Astronomía', 'Exoplanetas', 'NASA', 'Vida Extraterrestre'],
        featured: true,
    },
    {
        id: '5',
        title: 'Terapia génica cura la diabetes tipo 1 en ensayos clínicos',
        description:
            'Revolucionario tratamiento permite a pacientes producir insulina naturalmente tras una sola inyección de células modificadas.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
        category: 'Salud',
        categoryColor: '#14B8A6',
        author: 'Dra. Carmen Vega',
        date: '2026-02-06T14:10:00',
        views: '156.4k',
        readTime: 10,
        tags: ['Diabetes', 'Terapia Génica', 'Medicina', 'Innovación'],
        breaking: true,
    },
    {
        id: '6',
        title: 'Apple anuncia iPhone 18 con pantalla holográfica 3D',
        description:
            'La nueva generación elimina la necesidad de gafas VR con su revolucionaria pantalla que proyecta imágenes tridimensionales al aire.',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
        category: 'Tecnología',
        categoryColor: '#3B82F6',
        author: 'Alex Kim',
        date: '2026-02-05T20:00:00',
        views: '203.8k',
        readTime: 7,
        tags: ['Apple', 'iPhone', 'Holografía', 'Smartphones'],
    },
    {
        id: '7',
        title: 'Simone Biles completa el "Cuádruple Mortal" imposible',
        description:
            'La gimnasta estadounidense hace historia al realizar una maniobra que los físicos consideraban humanamente imposible.',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
        category: 'Deportes',
        categoryColor: '#10B981',
        author: 'Lucas Fernández',
        date: '2026-02-05T16:45:00',
        views: '89.6k',
        readTime: 4,
        tags: ['Gimnasia', 'Olimpiadas', 'Récord', 'USA'],
    },
    {
        id: '8',
        title: 'Netflix estrena serie interactiva con IA que se adapta a ti',
        description:
            '"Realidades Paralelas" usa inteligencia artificial para cambiar la trama en tiempo real según las preferencias del espectador.',
        image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800',
        category: 'Entretenimiento',
        categoryColor: '#EC4899',
        author: 'Maya Patel',
        date: '2026-02-05T12:30:00',
        views: '112.5k',
        readTime: 6,
        tags: ['Streaming', 'Netflix', 'IA', 'Series'],
    },
    {
        id: '9',
        title: 'Fusión nuclear logra energía neta positiva por primera vez',
        description:
            'El reactor experimental en Francia genera 3 veces más energía de la que consume, marcando un hito histórico en física.',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        category: 'Ciencia',
        categoryColor: '#8B5CF6',
        author: 'Dr. Henrik Larsson',
        date: '2026-02-04T19:20:00',
        views: '178.2k',
        readTime: 15,
        tags: ['Fusión Nuclear', 'Energía', 'Física', 'Medio Ambiente'],
    },
    {
        id: '10',
        title: 'Ayuno intermitente revierte signos de envejecimiento celular',
        description:
            'Estudio masivo con 50,000 participantes muestra rejuvenecimiento a nivel molecular tras 6 meses de protocolo específico.',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
        category: 'Salud',
        categoryColor: '#14B8A6',
        author: 'Dr. Yuki Tanaka',
        date: '2026-02-04T15:00:00',
        views: '145.7k',
        readTime: 9,
        tags: ['Longevidad', 'Nutrición', 'Ayuno', 'Anti-aging'],
    },
    {
        id: '11',
        title: 'UE aprueba ley histórica que regula la inteligencia artificial',
        description:
            'El parlamento europeo establece el primer marco regulatorio mundial para IA, prohibiendo sistemas de vigilancia masiva.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
        category: 'Política',
        categoryColor: '#F59E0B',
        author: 'Jean-Claude Dubois',
        date: '2026-02-04T11:15:00',
        views: '98.3k',
        readTime: 11,
        tags: ['Unión Europea', 'IA', 'Regulación', 'Privacidad'],
    },
    {
        id: '12',
        title: 'Bitcoin alcanza los $150,000 tras adopción institucional masiva',
        description:
            'Goldman Sachs y JP Morgan anuncian inversión conjunta de $50 mil millones en criptoactivos, disparando el mercado.',
        image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800',
        category: 'Economía',
        categoryColor: '#EF4444',
        author: 'Michael Chang',
        date: '2026-02-03T21:40:00',
        views: '234.6k',
        readTime: 8,
        tags: ['Bitcoin', 'Cripto', 'Wall Street', 'Finanzas'],
    },
];

// Función helper para obtener noticias por categoría
export const getNewsByCategory = (category: CategoryType): News[] => {
    if (category === 'Todas') return newsData;
    return newsData.filter((news) => news.category === category);
};

// Función helper para obtener categoría por nombre
export const getCategoryByName = (name: CategoryType): Category | undefined => {
    return categories.find((cat) => cat.name === name);
};

// Función helper para contar noticias por categoría
export const getNewsCounts = (): Record<CategoryType, number> => {
    const counts = {} as Record<CategoryType, number>;

    categories.forEach((category) => {
        if (category.name === 'Todas') {
            counts[category.name] = newsData.length;
        } else {
            counts[category.name] = newsData.filter(
                (news) => news.category === category.name,
            ).length;
        }
    });

    return counts;
};
