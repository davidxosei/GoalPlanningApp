import Nav from '../components/Nav';

export default function Home() {
    const username = "David";
    return (
        <div>
            <Nav />
            <h1>
                Hello, {username}!
            </h1>
            <h2>Your Roadmaps</h2>
        </div>
    );
}