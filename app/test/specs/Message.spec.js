import Vue from 'vue'
import Message from '@/components/Message'

describe('Message.vue', () => {
  const Component = Vue.extend(Message)

  beforeAll(() => {
    jasmine.clock().mockDate(new Date(2017, 1, 2, 0))
  })

  it('должно вернуть время в формате (H:mm) если прошло меньше суток со времени создания', () => {
    const vm = new Component({
      propsData: {
        authorID: 0,
        content: '',
        creationTime () { return new Date(2017, 1, 1, 9) }
      }
    }).$mount()

    expect(vm.time()).toBe('9:00')
  })

  it('должно вернуть время относительно текущего, если прошло больше суток', () => {
    const vm = new Component({
      propsData: {
        authorID: 0,
        content: '',
        creationTime () { return new Date(2012, 1, 1, 0) }
      }
    }).$mount()

    expect(vm.time()).toBe('5 лет назад')
  })
})
