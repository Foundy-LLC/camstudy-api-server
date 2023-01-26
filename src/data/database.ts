import pg from 'pg'

interface query{
    text:string,
    values?:any
}

const pool = new pg.Pool({
    host: "localhost",//process.env.DB_HOST,
    user: "daehyun",//process.env.DB_USER,
    password: "",//process.env.DB_PW,
    database: "postgres",//process.env.DB_NAME,
    port: 5432//parseInt(process.env.DB_PORT!,10)
});

export async function getConnection(){
    try{
        let connection = await pool.connect();
        console.log(`connectionId: ${connection}`);
        return connection;
    }
    catch (e) {
        console.log(`error on get connection: ${e}`);
    }
}

export async function execute(params: query){
    console.log(`on DB execute: ${params.text}, ${params.values}`)
    const {text, values} = params;
    console.log(Object.values(values))

    let connection:pg.PoolClient|undefined;
    try {
        connection = await getConnection();
        if(connection != undefined){
            const response = connection.query(text,Object.values(values)).then(res => res.rows[0]);

            connection.release();
            return response;
        }
    }
    catch (e) {
        if(!!connection){
            connection.release();
        }
        throw e;
    }
}

