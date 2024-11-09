import {Link} from 'react-router-dom'

const NavBar = () => {

    const navItem = [
        {id: 'home', path: '/adminhome', label: 'Home'},
        {id: 'categories', path: '/categories', label: 'Categories'}
    ]

    return(
        <header>
            <nav>
                <div>
                    {navItem.map(item => (
                        <Link key={item.id} to={item.path}>
                        {item.label}</Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}
export default NavBar