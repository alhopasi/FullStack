import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    console.log('Header:')
    console.log(props)
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part osa={props.parts[0].name} tehtavia={props.parts[0].exercises} />
            <Part osa={props.parts[1].name} tehtavia={props.parts[1].exercises} />
            <Part osa={props.parts[2].name} tehtavia={props.parts[2].exercises} />
        </div>
    )
}

const Total = (props) => {
    return (
        <p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.osa} {props.tehtavia}
        </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
            </div>
    )

}



ReactDOM.render(<App />, document.getElementById('root'));


