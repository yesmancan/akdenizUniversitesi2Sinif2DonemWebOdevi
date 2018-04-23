import { Component, OnInit, Input } from '@angular/core';

import { TagsService } from '../../services/tags.service';

import { Tag } from './../../models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags: Tag[];
  @Input() tag: Tag = new Tag;

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.getTags();
  };
  getTags(): void {
    this.tagsService.getTags().subscribe(res => {
      this.tags = res;
    });
  };
  addTag(tag: Tag): void {
    console.log(tag);
    this.tagsService.addTag(tag).subscribe(() => {
      this.tags.push(tag);
    });
  };
  delTag(tag: Tag): void {
    if (confirm(tag.name + " Etiketini Silmek İstediğinizden Emin misiniz ?")) {
      const i: number = this.tags.indexOf(tag);
      this.tagsService.delTag(tag).subscribe(() => {
        this.tags.splice(i, 1);
      });
    }
  };
  ngOnTagArray(tag: Tag): void {
    this.tag = tag;
  }
  updateTag(tag: Tag): void {
    if (confirm(tag.name + " Etiketi Güncellemek İstediğinizden Emin misiniz ?")) {
      this.tagsService.updateTag(tag).subscribe(res => {
        res.status === 200 && document.getElementById('formupdateClose').click()
      });
    }
  }
}
