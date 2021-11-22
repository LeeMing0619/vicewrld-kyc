import { Migration } from '@mikro-orm/migrations';

export class Migration20211121103502 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "metamask" text null;');
  }

}