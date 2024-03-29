import React, { Component } from 'react';
import { Text, Spinner, Divider } from '@ui-kitten/components';

export default class GetMyRetos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true
        };
    }

    componentDidMount() {

        try {

            fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/showreto/' + global.pos)
                .then((response) => response.json())
                .then((json) => {
                    this.setState({ data: json });
                })
                .catch((error) => console.log("err:  " + error))
                .finally(() => {
                    this.setState({ isLoading: false });
                });
        } catch (er) {
            console.log(er);
        }
    }

    render() {
        const { data, isLoading } = this.state;

        return (

            <>
                {isLoading ? (
                    <Spinner />
                ) : (
                        <>
                            <Text category='h3'> {data.titulo}</Text>
                            <Divider />
                            <Text category='h5'>{data.descripcion}</Text>
                            <Text category='s2'>No olvides tomar una foto y subirla a tu perfil</Text>
                        </>
                    )}
            </>

        );


    }

}