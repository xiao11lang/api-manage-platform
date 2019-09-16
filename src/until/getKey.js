export default function getKey() {
    const routeMap = {
      control: '1',
      manage: '2',
      test: '3',
      database: '4',
      testCase: '5',
      person: '6',
      workTeam: '7'
    }
    const hashArr = window.location.hash.split('/')
    const curRoutePath = hashArr[hashArr.length - 1]
    return routeMap[curRoutePath]
  }