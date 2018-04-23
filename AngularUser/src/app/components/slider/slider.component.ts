import { TagsService } from './../../services/tags.service';
import { Tag } from './../../../../../AngularPanel/src/app/models/tag';
import { Component, OnInit } from '@angular/core';

import { Slider } from '../../models/slider';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  sliders: Slider[] = [];
  tag: Tag[] = [];
  constructor(
    private sliderService: SliderService,
    private tagsService: TagsService) { }

  ngOnInit() {
    this.getSlider();
  }
  getSlider(): void {
    this.tagsService.getTags().subscribe(res => {
      this.tag = res;
    });
    this.sliderService.getSliders().subscribe(res => {
      res.forEach(e => {
        this.tag.forEach(t => {
          if (Number(e.label) === t.id) {
            e.label = t.name;
          }
        });
      });
      this.sliders = res;
      console.log(this);
    });
  }
  urlFixed(data: String) {
    if (data !== undefined) {
      data = data.replace(/ /gi, '-')
        .replace(/'/gi, '-');

      if (data.substring(1, 1) === '-') {
        data = data.replace('-', '');
      }
    }
    return data;
  }
}
