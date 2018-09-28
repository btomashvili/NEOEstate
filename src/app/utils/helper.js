import { Map, fromJS } from 'immutable'

export const mapListFromJS = (list, key = 'id', virtualFields = []) => {
  let result = new Map().toOrderedMap()
  list.forEach((item) => {
    // console.log(item)
    let map = fromJS(item)
    virtualFields.forEach((field) => {
      map = map.set(field.fieldName, field.func(map))
    })
    // map = map.set('index', index)
    result = result.set(item[key], map)
  })

  // result = result.sort((a, b) => a.get('index') - b.get('index'))
  return result
}

export const mapStringListFromJS = (list, fieldName = 'name') => {
  let result = new Map()
  list.forEach((item, index) => {
    const map = fromJS({
      [fieldName]: item,
    })
    result = result.set(item[index], map)
  })
  return result
}

export const getDistinctFieldList = (list, fieldName = 'name') => {
  let result = []
  list.forEach((item) => {
    result.push(item.get(fieldName))
  })
  result = result.filter((item, pos) => result.indexOf(item) === pos && item !== null)

  return mapStringListFromJS(result, fieldName)
}

export const generateAvatarText = (name) => {
  const names = name ? name.split(' ') : ['']
  let initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initials += `.${names[names.length - 1].substring(0, 1).toUpperCase()}`
  }
  return initials
}

export const generateCompanyLogoUrl = (item) => {
  if (!item) return null
  const logo = item.get('companyLogo')
  return logo !== undefined && logo !== null && logo !== '' ? `${process.env.apiUrl}/uploads/images/${logo}` : null
}

export const generateUserAvatarUrl = (userID, avatar) => {
  if (!generateUserAvatarUrl) return null
  return avatar !== undefined && avatar !== null && avatar !== ''
    ? `${process.env.apiUrl}/uploads/${userID}/${avatar}`
    : null
}

export const generateUserPdfUrl = (userID, token) => {
  if (!generateUserAvatarUrl) return null
  return token !== undefined && token !== null && token !== ''
    ? `${process.env.apiUrl}/api/v1/helpers/pdf/${userID}?access_token=${token}`
    : null
}

export const generateTravelDocUrl = (userID, filename) =>
  filename.length && userID.length ? `${process.env.apiUrl}/uploads/${userID}/${filename}` : null

export const generateFullAddress = (item) => {
  if (!item) return ''
  const address = item.get('address')
  return address !== undefined ? `${address.get('country')}, ${address.get('city')}, ${address.get('address1')}` : ''
}

export const generateFullName = item => (item ? `${item.get('firstName')} ${item.get('lastName')}` : '')

export const fullNameAbbr = (item) => {
  const value = generateFullName(item) || ' '
  return generateAvatarText(value)
}

export const removeArgsFromPath = (path) => {
  if (path !== undefined) {
    return path.split('/').length === 4
      ? path
          .split('/')
          .splice(0, 3)
          .join('/')
      : path
  }
  return path
}

export const getCurrentRouteTitle = props =>
  props.routes.filter(item => removeArgsFromPath(item.path) === removeArgsFromPath(props.location.pathname))[0].title

export const generateNotificationUrl = (item) => {
  switch (item.get('objectName')) {
  case 'Contact':
    return `/contact/view/${item.get('actionId')}`
  case 'Team':
    return `/team/view/${item.get('actionId')}`
  case 'Task':
    return `/task/view/${item.get('actionId')}`
  case 'Prospect':
    return `/prospect-activity/view/${item.get('actionId')}`
  case 'User':
    return `/user/view/${item.get('actionId')}`
  case 'Tag':
    return `/tag/edit/${item.get('actionId')}`
  case 'Group':
    return `/group/edit/${item.get('actionId')}`
  }

  if (item.get('team')) {
    return `/team/view/${item.get('team')}`
  }

  return '/notifications'
}

export const contactSearchQuery = search => ({
  where: {
    $or: [
      {
        firstName: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        jobPosition: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        location: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        companyName: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        email: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        phone: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        address: {
          $regex: search,
          $options: 'i',
        },
      },
    ],
  },
  pageSize: 10,
  page: 1,
  sort: '-created',
  // populate: ['owner', 'group'],
  // count: true,
})

export const userSearchQuery = search => ({
  where: {
    $or: [
      {
        firstName: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        lastName: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        jobPosition: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        location: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        companyName: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        email: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        phone: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        address: {
          $regex: search,
          $options: 'i',
        },
      },
    ],
  },
  pageSize: 10,
  page: 1,
  sort: '-created',
  // populate: ['owner', 'group'],
  // count: true,
})

export const fieldDistinctQuery = (field, search) => ({
  where: {
    [field]: {
      $regex: search,
      $options: 'i',
    },
  },
  distinct: field,
})

export const getFloorsList = (max, basement) => {
  if (!max) return fromJS({})
  const data = []
  for (let i = 1; i <= max; i++) {
    data.push({ title: i })
  }
  if (basement) {
    data.unshift({ title: 'Basement' })
    data.pop()
  }
  return fromJS(data)
}
