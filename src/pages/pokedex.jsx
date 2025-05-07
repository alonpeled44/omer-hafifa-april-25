import Card from "../components/card";
import { pokemonCardsArray } from "../components/pokemonCards";
import styles from "../styles/components/pokedex.module.css";
export default function pokedex() {
  return (
    <div className={styles["cardsContainer"]}>
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
