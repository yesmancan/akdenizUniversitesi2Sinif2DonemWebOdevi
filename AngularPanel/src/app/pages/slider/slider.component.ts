import { Component, OnInit } from '@angular/core';

import { SliderService } from './../../services/slider.service';

import { Slider } from '../../models/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  sliders: Slider[] = [];

  constructor(private sliderService: SliderService) { }

  ngOnInit() {
    this.getSlider();
  }
  urlFixed(data: String) {
    if (data !== undefined) {
      data = data.replace(/ /gi, '-')
        .replace(/'/gi, '-');

      if (data.substring(1, 1) == '-') {
        data = data.replace('-', '');
      }
    }
    return data;
  }
  deleteSlider(slider: Slider) {
    if (confirm(slider.name + " Sliderı Silmek İstediğinizden Emin misiniz ?")) {
      const i: number = this.sliders.indexOf(slider);
      this.sliderService.delNSlider(slider).subscribe(() => {
        this.sliders.splice(i, 1);
      });
    }
    this.getSlider();
  }
  getSlider(): void {
    this.sliderService.getSliders().subscribe(res => {
      this.sliders = res;
    });
  }
}
