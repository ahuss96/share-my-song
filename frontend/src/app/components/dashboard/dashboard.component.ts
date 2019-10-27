import { Component, OnInit } from '@angular/core';
import { SongsService } from "../../services/songs/songs.service";
import { ISongRecord } from "../song-record.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  songRecords: ISongRecord[] = [];

  constructor(private songService: SongsService) { }

  ngOnInit() {
    this.songService.getAllSongRecords().subscribe(data => {
      if (data.success) {
        this.songRecords = data.songRecords;
      }
    })
  }

}
