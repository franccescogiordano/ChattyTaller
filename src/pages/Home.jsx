import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
	return (<>
		<div className="div_home">
			<h1>
				Welcome to <Link to='/'>Chatty</Link>
			</h1>
		</div>
        </>
	);
}
export default Home;
