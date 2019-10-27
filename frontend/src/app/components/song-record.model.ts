export interface ISongRecord {
  _id: string;
  songs: [{
    name: string,
    artist: string,
    dateAdded: Date
  }]
}
