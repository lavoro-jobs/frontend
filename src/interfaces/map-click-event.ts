export default interface MapClickEvent {
    x: number;
    y: number;
    lat: number;
    lng: number;
    event: React.MouseEvent<HTMLDivElement>;
}