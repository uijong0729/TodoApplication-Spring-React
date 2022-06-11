import { Link } from 'react-router-dom';

export const Page2 = () => {
    return (
        <div>
            <h1>Page 2</h1>
            <Link to="/page2/999999">URL Parameter</Link>
            <br />
            <Link to="/page2/999999?name=이름">Query Parameter</Link>
        </div>
    )
}