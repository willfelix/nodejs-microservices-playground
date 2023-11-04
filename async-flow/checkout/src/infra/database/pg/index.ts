import pgp from "pg-promise";

export default class PgAdapter {
    connection;

    constructor() {
        this.connection = pgp()(
            "postgres://postgres:123456@localhost:5432/app"
        );
    }
}
