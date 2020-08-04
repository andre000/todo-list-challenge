import Vuex from 'vuex'
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils'
import TFrame from './TFrame.vue'
import { state, mutations, actions, getters, FullFrame } from '~/store'

jest.mock('@/services/ootz.ts')

const mockFrame = {
  id: 'foo123',
  order: 1,
  title: 'Test',
  todos: [],
  created_at: 'no-data'
} as FullFrame

describe('TTFrame component', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  let wrapper: Wrapper<any>

  beforeEach(() => {
    store = new Vuex.Store({ state, mutations, actions: actions as any, getters })
    wrapper = shallowMount(TFrame, {
      localVue,
      propsData: { frame: {} },
      store,
      stubs: ['draggable', 't-todo']
    })
  })

  it('should render a frame when given a frame prop', async () => {
    await wrapper.setProps({ frame: { ...mockFrame } })
    expect(wrapper.find('.frame__title').text()).toBe('Test')
  })

  it('should be editable when editMode prop is true', async () => {
    await wrapper.setProps({ frame: { ...mockFrame }, editMode: true })
    expect(wrapper.find('input.frame__title--edit').exists()).toBe(true)
    expect(wrapper.find('input.frame__actions').exists()).toBe(false)
  })

  it('should create a new todo when clicking on "+ add new task"', async () => {
    await wrapper.setProps({ frame: { ...mockFrame } })
    await wrapper.find('.frame__body__new').element.click()
    expect(wrapper.vm.$data.newTodo).toBeTruthy()
  })
})
