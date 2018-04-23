import { Component, OnInit } from '@angular/core';
import { SliderService } from '../../services/slider.service';
import { TagsService } from '../../services/tags.service';
import { ActivatedRoute } from '@angular/router';
import { Slider } from '../../models/slider';
import { Tag } from '../../models/tag';

@Component({
  selector: 'app-slider-update',
  templateUrl: './slider-update.component.html',
  styleUrls: ['./slider-update.component.scss']
})
export class SliderUpdateComponent implements OnInit {

  ImgUrl: String;
  imgbase64: String;
  paramId: Number = 0;
  tags: Tag[] = [];
  tagselectedTags: string[] = [];
  slider: Slider = new Slider;

  constructor(
    private newsService: SliderService,
    private tagsService: TagsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tagsService.getTags().subscribe((res) => {
      this.tags = res;
    });
    this.route.params.subscribe((params) => {
      this.paramId = params.id;
      this.getData(this.paramId);
    });
  }
  getData(p: Number) {
    this.newsService.getSlider(p)
      .map((res) => res)
      .subscribe(
        data => {
          this.slider = data;
          this.ImgUrl = data.img;
          this.imgbase64 = data.img;
        },
        err => console.error(err),
        () => {
          //ckeditor için işlemleri html üzerine uyguluyoruz 
          let editor = document.querySelector('app-ckeditor').querySelector('textarea');
          editor.innerHTML = this.slider.text.toString();
          console.log('done');
        }
      );

  }
  GetTags(event) {
    this.slider.label += event.value;
    this.tagselectedTags.push(event);
  }
  UpdateNew(ckeditor: any, sel, Header: any, Name: any): void {
    this.slider.text = ckeditor;
    this.slider.label = sel;
    this.slider.name = Name;
    this.slider.header = Header;
    this.slider.img = this.imgbase64;
    this.slider.editor = Number(sessionStorage.getItem('token')) || 0;

    this.newsService.updateSlider(this.slider).subscribe((res) => {
      if (res.status === 200) {
        alert("Güncelleme İşlemi Tamamlanmıştır.");
      }
    });
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
