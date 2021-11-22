import { Migration } from '@mikro-orm/migrations'

export class Migration20210810103500 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "relationship" drop constraint if exists "relationship_status_check";'
    )
    this.addSql(
      'alter table "relationship" alter column "status" type text using ("status"::text);'
    )
    this.addSql(
      "alter table \"relationship\" add constraint \"relationship_status_check\" check (\"status\" in ('None', 'Following', 'FollowedBy', 'MutualFollow', 'Blocking', 'Blocked'));"
    )
  }
}
