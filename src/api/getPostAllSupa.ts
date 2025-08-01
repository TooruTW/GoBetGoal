import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

const getPostAllSupa = async () => {
    const { data, error } = await supabase
    .from('post')
    .select('*,user_info(nick_name,charactor_img_link),trial(title,challenge(title)),post_like(like_by)')

    if(error) throw error;
    return data;
};

export function usePostAllSupa() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["postAll"],
        queryFn: getPostAllSupa,
    });
    return { data, isLoading, error };
}

