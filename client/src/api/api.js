import axios from "axios"

const getUsers = async (setUsers, setTotalPages, selectedPage, setDataLoading = false) => {
    try {
        setDataLoading && setDataLoading(true)
        await axios.get(`https://taskfourauth.herokuapp.com/api/users/data?page=${selectedPage - 1}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                setUsers(res.data.users)
                setTotalPages(res.data.pages)
                setDataLoading && setDataLoading(false)
            })
    } catch (error) {
        setDataLoading && setDataLoading(false)
        console.log(error);
    }
}


export {
    getUsers
}