import fileDownload from 'react-file-download'
import json2csv from 'json2csv'
import moment from 'moment'
import { generateFullName } from './helper'
// const// json2csv = require('json2csv')

export const exportParticipants = (list, translate) => {
  const data = []
  const fields = ['last_name', 'first_name', 'email', 'organization', 'categories', 'regis_date']
  const fieldNames = [
    translate('last_name'),
    translate('first_name'),
    translate('email'),
    translate('organization'),
    translate('categories'),
    translate('regis_date'),
  ]
  list.forEach((item) => {
    data.push({
      last_name: item.get('lastName'),
      first_name: item.get('firstName'),
      email: item.get('email'),
      organization: item.getIn(['info', 'forAdmin', 'companyInformation', 'companyName']),
      categories: item.getIn(['info', 'forAdmin', 'companyInformation', 'typeOfCompany']),
      regis_date: moment(item.get('createdAt')).format('DD-MM-YYYY'),
    })
  })
  const csv = json2csv({ data, fields, fieldNames })
  fileDownload(csv, 'participants.csv')
}
