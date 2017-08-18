import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

/**
 * Generated class for the OrderByPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  transform(array, args) {
  	console.log("PIPE SCOPE",array,args);
  	// return array;
    return _.sortBy(array, args);
  }
}
