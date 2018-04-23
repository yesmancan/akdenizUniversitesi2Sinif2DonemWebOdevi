import { Component, OnInit } from '@angular/core';

import { Slider } from './../../models/slider';
import { Tag } from './../../models/tag';

import { SliderService } from './../../services/slider.service';
import { TagsService } from './../../services/tags.service';


@Component({
  selector: 'app-slider-add',
  templateUrl: './slider-add.component.html',
  styleUrls: ['./slider-add.component.scss']
})
export class SliderAddComponent implements OnInit {
  slider: Slider = new Slider;
  tags: Tag[] = [];
  ImgUrl: String;
  imgbase64;

  constructor(
    private sliderService: SliderService,
    private tagsService: TagsService) { }

  ngOnInit() {
    this.tagsService.getTags().subscribe(
      data => this.tags = data,
      err => console.error(err),
      () => console.log('done')
    );
  }
  SaveSlider(ckeditor: any, sel: any, Header: any, Name: any): void {

    this.slider.text = ckeditor;
    this.slider.label = sel;
    this.slider.name = Name;
    this.slider.header = Header;
    this.slider.img = this.imgbase64;
    this.slider.editor = Number(sessionStorage.getItem('userId') || 0);

    this.sliderService.addSlider(this.slider).subscribe((res) => {
      console.log(res);
    });

  }

  readImgUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.ImgUrl = event.target.result;
        this.imgbase64 = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
