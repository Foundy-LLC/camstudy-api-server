import pg from 'pg'

interface query{
    text:string,
    values?:any
}
// Todo: 환경변수로 바꿀 것
const pool = new pg.Pool({
    host: "localhost",//process.env.DB_HOST,
    user: "daehyun",//process.env.DB_USER,
    password: "",//process.env.DB_PW,
    database: "postgres",//process.env.DB_NAME,
    port: 5432//parseInt(process.env.DB_PORT!,10)
});

/**
 * DB pool에 커넥션
 */
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

/**
 * 쿼리 실행
 * @param params
 * Param 객체에는 text와 values가 있다.
 * text는 쿼리문이 들어가고,
 * values에는 입력 값이 들어간다.
 */
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

