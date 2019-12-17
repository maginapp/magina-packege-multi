import { sayHi } from '../../../app/hello.ts'

describe('hello.ts: sayHi  function test',function () {
  it('Han Meimei',function () {
    expect(sayHi('Han Meimei')).to.be.equal('Hi,Han Meimei!');
  });

  it('magina',function () {
    expect(sayHi('magina')).to.be.equal('Hi,magina!');
  })

})