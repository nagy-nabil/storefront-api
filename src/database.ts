import { Pool } from 'pg';
const { PG_HOST, PG_DB, PG_TEST_DB, PG_PORT, PG_USER, PG_PASSWORD, ENV } =
    process.env;
let client: Pool;
if (ENV === 'test') {
    client = new Pool({
        host: PG_HOST,
        port: +(PG_PORT as string) || 5432,
        database: PG_TEST_DB,
        user: PG_USER,
        password: PG_PASSWORD
    });
} else {
    client = new Pool({
        host: PG_HOST,
        port: +(PG_PORT as string) || 5432,
        database: PG_DB,
        user: PG_USER,
        password: PG_PASSWORD
    });
}
export default client;
