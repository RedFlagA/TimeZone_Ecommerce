const checkAuth: any  =() =>{
  const getToken = localStorage.getItem('token')
  return getToken ? true: false
}
export default checkAuth
