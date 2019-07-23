export default class WindowNavigation{
    static goToLocation(location){
        window.location.href = `http://${window.location.hostname}:${window.location.port}${location}`;
    }
}