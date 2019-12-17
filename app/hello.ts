console.log('111')




export function sayHi (name: string): string {
  function s () {
    const a = {a: 1}
    return a
  }
  
  console.log(s())
  return `Hi,${name}!`
}