export default function Card({id, name , type, height, weight, frontViewImageUrl, backViewImageUrl, frontShinyViewImageUrl, backShinyViewImageUrl}) {
    return (
        <div>
            <p>{id}</p>
            <p>{name}</p>
            <p>{type}</p>
            <p>{height}</p>
            <p>{weight}</p>
            <p>{frontViewImageUrl}</p>
            <p>{backViewImageUrl}</p>
            <p>{frontShinyViewImageUrl}</p>
            <p>{backShinyViewImageUrl}</p>
        </div>
    )
} 