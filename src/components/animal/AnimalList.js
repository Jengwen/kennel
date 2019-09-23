import React, { Component } from 'react'
//import the components we will need
import AnimalCard from './AnimalCard'
import AnimalManager from '../../modules/AnimalManager'

class AnimalList extends Component {
    //define what this component needs to render
    state = {
        animals: [],
    };
    // call method to delete animal and return refreshed list of animals
    deleteAnimal= id => {
        AnimalManager.softDelete(id)
            .then(AnimalManager.getAll)
            .then(animals => {
                this.setState({
                    animals: animals
                })
            })
    }

    componentDidMount() {
        console.log("ANIMAL LIST: ComponentDidMount");
        //getAll from AnimalManager and hang on to that data; put it in state
        AnimalManager.getAll()
            .then((animals) => {
                this.setState({
                    animals: animals
                })
            })
    }

    render() {
        console.log("ANIMAL LIST: Render");

        return (
            <div className="container-cards">
                {this.state.animals.map(singleAnimal =>
                 !singleAnimal.archived ? (
                    <AnimalCard deleteAnimal= {this.deleteAnimal}
                    key={singleAnimal.id} animalProp={singleAnimal}
                    />
                    ) : (
                        null
                      )
                    )}
            </div>
        )
    }
}

export default AnimalList