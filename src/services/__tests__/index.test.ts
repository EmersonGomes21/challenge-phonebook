import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  fetchContacts,
  createContact,
  baseUrl,
  urlRequest,
  editContact,
  deleteContact
} from '../api'

describe('PhoneBook API', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.restore()
  })

  it('should fetch contacts successfully', async () => {
    const data = [
      { id: 1, name: 'John Doe', phone: '1234567890' },
      { id: 2, name: 'Jane Doe', phone: '0987654321' }
    ]
    mock.onGet(baseUrl).reply(200, data)

    mock.onGet(urlRequest).reply(200, data)

    const response = await fetchContacts()

    expect(response.status).toBe(200)
    expect(response.data).toEqual(data)
  })

  it('should create a new contact successfully', async () => {
    const data = { name: 'John Doe', phone: '1234567890' }
    mock.onPost(baseUrl).reply(200, { message: 'Contact created successfully' })

    mock
      .onPost(urlRequest)
      .reply(200, { message: 'Contact created successfully' })

    await createContact(data)

    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0].data).toBe(JSON.stringify(data))
  })

  it('should edit a contact successfully', async () => {
    const data = { id: 1, name: 'John Doe', phone: '0987654321' }
    mock
      .onPut(urlRequest + '/1')
      .reply(200, { message: 'Contact updated successfully' })

    await editContact(data)

    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0].data).toBe(JSON.stringify(data))
  })

  it('should delete a contact successfully', async () => {
    const id = 1
    mock
      .onDelete(urlRequest + '/1')
      .reply(200, { message: 'Contact deleted successfully' })

    await deleteContact(id)

    expect(mock.history.delete.length).toBe(1)
  })
})
