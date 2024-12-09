
export const formatViewsCount = (count) => {
    if (count >= 1e6) {
        return (count / 1e6).toFixed(1).replace(/\.0$/, '') + ' млн просмотров'
    }
    if (count >= 1e3) {
        return (count / 1e3).toFixed(1).replace(/\.0$/, '') + ' тыс просмотров'
    }
    return count + ' просмотров'
};