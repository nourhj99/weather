import React from 'react'; 



const weather =(props) =>
{

function MinMax(min, max)
    {
        if(min && max)
        {
        return(
            <h2>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
            </h2>
        )
        } 
        return null;
    }

    return(
    <div className="contianer text-light">
        <div className="cards pt-4">
        <h1>
        {props.city}
        </h1>
        <h1>
<i className={`wi ${props.weatherIcon}`}></i>
</h1>
        {props.temp_celsius ? <h1 className="py-2">{props.temp_celsius}&deg;</h1> : null}
        {MinMax(props.temp_min,props.temp_max)}
        <h4 className="py-3">{props.description}</h4>
        </div>

    </div>

    );
}

export default weather ;