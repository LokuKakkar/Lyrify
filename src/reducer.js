export const initialState = {
    user: null,
    playlist: [],
    playing: false,
    item: null,
    token: null,
    // token: "BQDmbPdajJOaV0J89pbHeKEQ0uMv58UXYnEAS1INlV1YEgZvQCprXQ8KE-1hJT5ewWHWNutPU2dqlNiQUiqJ1QEdWdgutY5ElC8twSG9LTaaRTHHCrvWc5vQM-nA0lrxBxP-Bn3-lqXgp2iyj6X3JEGK-PlTznoTDlVUh4u9APsNGzfyc2v_LQQiW3HHGMcpMFIjvGbY51o-STsC4qxX"
    // token: "BQDOhrGGc_bQ1CdS2nruQuX85iEZBPVCd2uDB6nf1yiYfAnszZDI_xyJLb-AA5l7zu1hKpdCzxxTZm_nqUT4Mb-G3bF3KQ9IIWgLqqR5pNvcohKHPVArgZd57fRNdNl7qrlRcSftuRO5Qeuu7N2chZxxWK9V_lj0Bn7RZlnqYOeKdDk189LVXWSDSN8NOsyg1dwSlcRjOhuhvtSrmAxr"
};

const reducer = (state,action) =>{
    console.log(action);

    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };

        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists,
            }

        case 'SET_DISCOVER_WEEKLY':
            return{
                ...state,
                discover_weekly: action.discover_weekly,
            }


        case "SET_PLAYING":
            return {
              ...state,
              playing: action.playing,
            };
          
        case "SET_ITEM":
            return {
              ...state,
              item: action.item,
            };


        case "SET_TOP_ARTISTS":
            return {
              ...state,
              top_artists: action.top_artists,
            };

        default:
            return state;
    }

}

export default reducer;