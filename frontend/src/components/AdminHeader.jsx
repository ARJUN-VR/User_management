import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { localStoreLogout } from "../../AdminSlices/AuthSlices";
import { useSelector,useDispatch } from "react-redux";
import { useAdminLogoutMutation } from "../../AdminSlices/adminApiSlices"
import { useNavigate } from "react-router-dom";



const AdminHeader = () => {
    const {adminInfo} = useSelector((state)=>state.adminAuth)
    const [logout] = useAdminLogoutMutation();

    const dispatch = useDispatch()
    const navigate = useNavigate()

const logoutHandler=async()=>{
    try {
        await logout().unwrap()
        dispatch(localStoreLogout())
        navigate('/admin')
    } catch (err) {
        console.log(err.message);
    }
    
}

  return (
     <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN APP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {adminInfo ? (
                <>
                  <NavDropdown title={adminInfo.name} id="username">
                    <NavDropdown.Item onClick={logoutHandler}>
                      logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
              
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default AdminHeader