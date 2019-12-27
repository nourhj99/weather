import React from 'react';


class News extends React.Component {

    getNews = async (e) => {

    }

    componentDidMount() {

        if (this.props.city == "undefined") {
            return (
                <div></div>
            )
        }
        else {
            const API_Key2 = "676a411cc11646a7b36b400fef47a330";
            try {
                const api_call1 = await fetch(`https://newsapi.org/v2/everything?q=${this.props.city}&from=2019-11-21&sortBy=publishedAt&apiKey=${API_Key2}`);
                const response = await api_call1.json();
                const t = response.article;
                const tab = t.map(res => {
                    if(t.length<4)
                    return (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3 offset-md-2">
                                    <img src={res.urlToImage}></img>
                                    <h1>{res.title}</h1>
                                    <p>{res.description}</p>
                                    <h4>{res.author}</h4>
                                </div>
                            </div>
                        </div>
    
                    )
                })
            }
            catch (error) { console.log(error); }
    
        

        }
    }

    render() {
        return (
            <div>
                   {tab}
            </div>
        );
    }
}

export default News;