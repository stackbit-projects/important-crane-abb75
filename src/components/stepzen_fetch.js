import { gql, useQuery } from "@apollo/client";

function StepZenLaunch() {
    const { loading, error, data } = useQuery(GET_QUERY);
    console.log(data)

    if (loading) return <p>Loading ...</p>;

    if (error) return <pre>ERROR: {JSON.stringify(error, null, 2)}</pre>;
    return (
        <div className="App">
            <header className="App-header">
                <img src={StepZenLogo} alt="StepZen Logo" width="300px" />
                <h2 style={{ marginTop: "40px" }}>Latest launches information pulled from StepZen Endpoint:</h2>
                <CardList>
                    {data.launchesPast.map(launch => (
                        <Card key={launch.id}>
                            <b className="Title">{launch.mission_name}</b>
                            <br />
                        </Card>
                    ))}
                </CardList>
            </header>
        </div>
    );
}
export default StepZenLaunch;