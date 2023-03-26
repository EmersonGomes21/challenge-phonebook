import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

mock.onAny().reply(200, {})

global.fetch = require('jest-fetch-mock')
