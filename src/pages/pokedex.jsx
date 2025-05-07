import Card from "../components/card";
import { pokemonCardsArray } from "../components/pokemonCards";

export default function pokedex() {
  return (
    <div>
        {pokemonCardsArray.map((card)=> (
            <Card
              id={card.id}
              name={card.name}
              type={card.type}
              height={card.height} 
              weight={card.weight} 
              frontViewImageUrl={card.frontViewImageUrl} 
              backViewImageUrl={card.backViewImageUrl} 
              frontShinyViewImageUrl={card.frontShinyViewImageUrl} 
              backShinyViewImageUrl={card.backShinyViewImageUrl} 
            />
        ))}
    </div>
  );
}
