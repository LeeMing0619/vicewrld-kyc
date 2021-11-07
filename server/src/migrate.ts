import { MikroORM } from '@mikro-orm/core'
import { mikroOrmConf } from '@/config/mikro-orm.config'
;(async () => {
  const orm = await MikroORM.init(mikroOrmConf)

  const migrator = orm.getMigrator()
  process.env.MIGRATE_INITIAL === 'true'
    ? await migrator.createInitialMigration('./migrations')
    : await migrator.createMigration('./migrations')
  await migrator.up()
  await orm.close(true)
  process.exit(0)
})()
