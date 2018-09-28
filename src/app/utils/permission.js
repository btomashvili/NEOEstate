// import obj from './roleObject'

export const roles = {
  superAdmin: 'Super Admin',
  admin: 'Admin',
  international: 'International Participant',
  staff: 'ITC Staff',
  national: 'National Participant',
  speakerModerator: 'Speaker / Moderator',
}

// export const permissions = {
//   addTeam: 'Add team',
//   editTeam: 'Edit team',
//   deleteTeam: 'Delete team',

//   addUser: 'Add user',
//   listUsers: 'List users',
//   editUser: 'Edit user',
//   deleteUser: 'Delete user',

//   addTask: 'Add task',
//   listTasks: 'List tasks',
//   editTask: 'Edit task',
//   deleteTask: 'Delete task',

//   addProspect: 'Add prospect activity',
//   listProspects: 'List prospect activities',
//   editProspect: 'Edit prospect activity',
//   deleteProspect: 'Delete prospect activity',

//   addTag: 'Add tag',
//   listTags: 'List tags',
//   editTag: 'Edit tag',
//   deleteTag: 'Delete tag',

//   addGroup: 'Add group',
//   listGroups: 'List groups',
//   editGroup: 'Edit group',
//   deleteGroup: 'Delete group',

//   aquireContact: 'Aquire contact',
//   addContact: 'Add contact with by contact add form',
//   scanContactBc: 'Scan and process contact BC with mobile application',
//   importContact: 'Import contact',
//   editContact: 'Edit contact',
//   shareContact: 'Share contact',
//   listContacts: 'List contact',
//   deleteContact: 'Delete contact',
//   searchContacts: 'Search contact',

//   editEnterpriseAccount: 'Edit enterprise account information',
//   editEnterpriseAccountSettings: 'Edit enterprise account settings',
//   deactivateEnterprise: 'Deactivate Enterprise account',
//   setSharingMode: 'Set sharing mode',
//   exportContacts: 'Export contacts',
//   reporting: 'Reporting',
// }

// export const checkPermission = (permission = '', item) => {
//   const { isGlobalSharing, role, id: userId, teamId } = JSON.parse(localStorage.user)

//   if (role === roles.Admin || role === roles.EAM) {
//     return true
//   }

//   // if (permission === 'Edit contact') {
//   //   debugger
//   // }

//   const filter = obj.roleObjects.filter(i => i.role === role)

//   const currPermissions = filter.length > 0 ? filter[0].permissions : []

//   const result = currPermissions.filter(i => i.name === permission)

//   if (result.length <= 0) {
//     return false
//   }

//   const currentPermission = (isGlobalSharing) ? result[0].globalSharing : result[0].restrictedSharing
//   const { own, enterprise } = currentPermission
//   if (!own && !enterprise) {
//     return false
//   }

//   if (item) {
//     // debugger
//     if (role === roles.TeamLeader) {
//       const assignTo = ((item.get('assignTo')) ? item.get('assignTo') : userId) !== userId
//       if (item.get('team')) {
//         if (!enterprise && (teamId !== item.get('team') || assignTo)) {
//           return false
//         }
//       } else if (!enterprise && teamId !== item.get('team')) {
//         return false
//       }
//     } else if (role === roles.User) {
//       let owner = item.get('owner')
//       if (typeof owner !== 'string' && owner !== undefined) {
//         owner = owner.get('id')
//       }
//       const assignTo = ((item.get('assignTo')) ? item.get('assignTo') : userId) === userId
//       if (!enterprise && owner !== userId && !assignTo) {
//         return false
//       }
//     }
//     return true
//   }

//   return true
// }

// export const setItemPermission = (permission = '') => {
//   const { isGlobalSharing, role, id: userId, teamId } = JSON.parse(localStorage.user)

//   if (role === roles.Admin || role === roles.EAM) {
//     return () => true
//   }

//   const filter = obj.roleObjects.filter(i => i.role === role)

//   const currPermissions = filter.length > 0 ? filter[0].permissions : []

//   const result = currPermissions.filter(i => i.name === permission)

//   if (result.length <= 0) {
//     return () => false
//   }

//   const currentPermission = (isGlobalSharing) ? result[0].globalSharing : result[0].restrictedSharing
//   const { own, enterprise } = currentPermission
//   if (!own && !enterprise) {
//     return () => false
//   }

//   return (item) => {
//     if (role === roles.TeamLeader) {
//       const assignTo = ((item.get('assignTo')) ? item.get('assignTo') : userId) !== userId
//       if (item.get('team')) {
//         if (!enterprise && teamId !== item.get('team') && assignTo) {
//           return false
//         }
//       } else if (!enterprise && teamId !== item.get('team')) {
//         return false
//       }
//     } else if (role === roles.User) {
//       let owner = item.get('owner')
//       if (typeof owner !== 'string' && owner !== undefined) {
//         owner = owner.get('id')
//       }
//       const assignTo = ((item.get('assignTo')) ? item.get('assignTo') : userId) === userId
//       if (!enterprise && owner !== userId && !assignTo) {
//         return false
//       }
//     }
//     return true
//   }
// }

// export const setUserPermission = () => {
//   const response = {}
//   Object.keys(permissions).forEach((key) => {
//     response[key] = checkPermission(permissions[key])
//   })
//   return response
// }
