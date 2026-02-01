import { Loader, Star } from "lucide-react";

type Props = {
    selected: boolean;
    loading: boolean;
}

export default function StarButton({selected, loading}: Props) {
  return (
    <div className="hover:opacity-80 transition cursor-pointer">
        {!loading ? (
            <Star 
                size={28}
                color={selected ? 'white' : 'black'}
                className={selected ? 'fill-yellow-300' : ''}
            />
        ) : (
            <Loader size={28} className="animate-spin" />
        )}
    </div>
  )
}