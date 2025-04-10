const Header = ({ title, image, children }) => {
    return (
        <header className="headerr" style={{ backgroundImage: `url(${image})` }}>
            <div className="headerr_container">
                <div className="headerr_content">
                    <h2>{title}</h2>
                    <p>{children}</p>
                </div>
            </div>
        </header>
    );
}
export default Header;
