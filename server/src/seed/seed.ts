import { EntityManager } from '@mikro-orm/postgresql'
import {
  Channel,
  Folder,
  Message,
  MessageType,
  Role,
  Server,
  ServerCategory,
  ServerFolder,
  ServerUser,
  User,
  UserFolder
} from '@/entity'
import { ReorderUtils } from '@/util'
import * as argon2 from 'argon2'

export async function seed(em: EntityManager) {
  let viceServer = await em.findOne(Server, { name: 'Vicewrld' })
  if (!viceServer) {
    const viceUser = em.create(User, {
      username: 'superduper',
      isAdmin: true,
      isPremium: true,
      avatarUrl: 'https://media.joincomet.app/sQAofmn1NgoJiTCVfz9D3.png',
      passwordHash: await argon2.hash(
        process.env.SUPER_USER_PASSWORD || 'password'
      )
    })
    viceServer = em.create(Server, {
      name: 'Vicewrld',
      displayName: 'Vicewrld',
      description: 'Official discussion and announcements relating to Vicewrld',
      category: ServerCategory.Meta,
      avatarUrl:
        'https://vicewrld.com/img/vicewrld/avatars/vice-server-avatar.jpg',
      bannerUrl:
        'https://vicewrld.com/img/vicewrld/avatars/vice-server-banner.jpg',
      isFeatured: true,
      featuredPosition: ReorderUtils.FIRST_POSITION,
      owner: viceUser
    })
    const defaultRole = em.create(Role, {
      name: 'Default',
      server: viceServer,
      isDefault: true
    })
    const viceServerUser = em.create(ServerUser, {
      server: viceServer,
      user: viceUser,
      role: defaultRole
    })

    const generalChannel = em.create(Channel, {
      name: 'general',
      server: viceServer,
      isDefault: true
    })
    const initialMessage = em.create(Message, {
      channel: generalChannel,
      type: MessageType.Initial,
      author: viceUser
    })

    const announcementsFolder = em.create(Folder, {
      name: 'Announcements',
      server: viceServer
    })
    const announcementsServerFolder = em.create(ServerFolder, {
      server: viceServer,
      folder: announcementsFolder
    })

    const readLaterFolder = em.create(Folder, {
      name: 'Read Later',
      owner: viceUser
    })
    const favoritesFolder = em.create(Folder, {
      name: 'Favorites',
      owner: viceUser
    })
    const readLaterUserFolder = em.create(UserFolder, {
      user: viceUser,
      folder: readLaterFolder,
      position: ReorderUtils.positionAfter(ReorderUtils.FIRST_POSITION)
    })
    const favoritesUserFolder = em.create(UserFolder, {
      user: viceUser,
      folder: favoritesFolder
    })

    await em.persistAndFlush([
      viceUser,
      viceServer,
      generalChannel,
      initialMessage,
      defaultRole,
      announcementsFolder,
      announcementsServerFolder,
      viceServerUser,
      readLaterFolder,
      readLaterUserFolder,
      favoritesFolder,
      favoritesUserFolder
    ])
  }
}
