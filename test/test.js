/**
* @license Apache-2.0
*
* Copyright (c) 2025 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var isNegativeZero = require( '@stdlib/math-base-assert-is-negative-zero' );
var isPositiveZero = require( '@stdlib/math-base-assert-is-positive-zero' );
var abs = require( '@stdlib/math-base-special-abs' );
var EPS = require( '@stdlib/constants-float64-eps' );
var PINF = require( '@stdlib/constants-float64-pinf' );
var NINF = require( '@stdlib/constants-float64-ninf' );
var atan2d = require( './../lib' );


// FIXTURES //

var positivePositive = require( './fixtures/julia/positive_positive.json' );
var negativePositive = require( './fixtures/julia/negative_positive.json' );
var negativeNegative = require( './fixtures/julia/negative_negative.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof atan2d, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function has two parameters: a numerator and a denominator value', function test( t ) {
	t.equal( atan2d.length, 2.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN` as either of the arguments', function test( t ) {
	t.equal( isnan( atan2d( 2.0, NaN ) ), true, 'returns expected value' );
	t.equal( isnan( atan2d( NaN, 3.0 ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+0` if provided `y = +0.0` and `x >= 0`', function test( t ) {
	t.equal( isPositiveZero( atan2d( +0.0, 0.0 ) ), true, 'returns expected value' );
	t.equal( isPositiveZero( atan2d( +0.0, 2.0 ) ), true, 'returns expected value' );
	t.equal( isPositiveZero( atan2d( +0.0, 4.0 ) ), true, 'returns expected value' );
	t.equal( isPositiveZero( atan2d( +0.0, 5.0 ) ), true, 'returns expected value' );
	t.equal( isPositiveZero( atan2d( +0.0, 10.0 ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-0` if provided `y = -0.0` and `x >= 0`', function test( t ) {
	t.equal( isNegativeZero( atan2d( -0.0, 0.0 ) ), true, 'returns expected value' );
	t.equal( isNegativeZero( atan2d( -0.0, 2.0 ) ), true, 'returns expected value' );
	t.equal( isNegativeZero( atan2d( -0.0, 4.0 ) ), true, 'returns expected value' );
	t.equal( isNegativeZero( atan2d( -0.0, 5.0 ) ), true, 'returns expected value' );
	t.equal( isNegativeZero( atan2d( -0.0, 10.0 ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `180.0` if provided `y = +0.0` and `x <= -0.0`', function test( t ) {
	t.equal( atan2d( +0.0, -0.0 ), 180.0, 'returns expected value' );
	t.equal( atan2d( +0.0, -2.0 ), 180.0, 'returns expected value' );
	t.equal( atan2d( +0.0, -4.0 ), 180.0, 'returns expected value' );
	t.equal( atan2d( +0.0, -5.0 ), 180.0, 'returns expected value' );
	t.equal( atan2d( +0.0, -10.0 ), 180.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-180.0` if provided `y = -0.0` and `x <= -0.0`', function test( t ) {
	t.equal( atan2d( -0.0, -0.0 ), -180.0, 'returns expected value' );
	t.equal( atan2d( -0.0, -2.0 ), -180.0, 'returns expected value' );
	t.equal( atan2d( -0.0, -4.0 ), -180.0, 'returns expected value' );
	t.equal( atan2d( -0.0, -5.0 ), -180.0, 'returns expected value' );
	t.equal( atan2d( -0.0, -10.0 ), -180.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `45.0` if provided `x = y = +infinity`', function test( t ) {
	t.equal( atan2d( PINF, PINF ), 45.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-45.0` if provided `x = -y = +infinity`', function test( t ) {
	t.equal( atan2d( NINF, PINF ), -45.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `135.0` if provided `-x = y = +infinity`', function test( t ) {
	t.equal( atan2d( PINF, NINF ), 135.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-135.0` if provided `x = y = -infinity`', function test( t ) {
	t.equal( atan2d( NINF, NINF ), -135.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `0.0` when `x = +infinity`', function test( t ) {
	t.equal( atan2d( -2.0, PINF ), 0.0, 'returns expected value' );
	t.equal( atan2d( 0.0, PINF ), 0.0, 'returns expected value' );
	t.equal( atan2d( 2.0, PINF ), 0.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `180.0` when `y > 0` and `x = -infinity`', function test( t ) {
	t.equal( atan2d( 1.0, NINF ), 180.0, 'returns expected value' );
	t.equal( atan2d( 2.0, NINF ), 180.0, 'returns expected value' );
	t.equal( atan2d( 3.0, NINF ), 180.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-180.0` when `y < 0` and `x = -infinity`', function test( t ) {
	t.equal( atan2d( -1.0, NINF ), -180.0, 'returns expected value' );
	t.equal( atan2d( -2.0, NINF ), -180.0, 'returns expected value' );
	t.equal( atan2d( -3.0, NINF ), -180.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `90.0` when `y = +infinity`', function test( t ) {
	t.equal( atan2d( PINF, -1.0 ), 90.0, 'returns expected value' );
	t.equal( atan2d( PINF, 0.0 ), 90.0, 'returns expected value' );
	t.equal( atan2d( PINF, 2.0 ), 90.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-90.0` when `y = -infinity`', function test( t ) {
	t.equal( atan2d( NINF, -1.0 ), -90.0, 'returns expected value' );
	t.equal( atan2d( NINF, 0.0 ), -90.0, 'returns expected value' );
	t.equal( atan2d( NINF, 2.0 ), -90.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `90.0` if provided a positive `y` and `x=0`', function test( t ) {
	t.equal( atan2d( 2.0, 0.0 ), 90.0, 'returns expected value' );
	t.equal( atan2d( 1.0, 0.0 ), 90.0, 'returns expected value' );
	t.equal( atan2d( 0.5, 0.0 ), 90.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `90.0` if provided a negative `y` and `x=0`', function test( t ) {
	t.equal( atan2d( -2.0, 0.0 ), -90.0, 'returns expected value' );
	t.equal( atan2d( -1.0, 0.0 ), -90.0, 'returns expected value' );
	t.equal( atan2d( -0.5, 0.0 ), -90.0, 'returns expected value' );
	t.end();
});

tape( 'the function evaluates the `atan2d` function (when x and y are positive)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	y = positivePositive.y;
	x = positivePositive.x;
	expected = positivePositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = atan2d( y[i], x[i] );
		delta = abs( actual - expected[i] );
		tol = 1.2 * EPS * abs( expected[i] );
		t.equal( delta <= tol, true, 'within tolerance. y: '+y[i]+'. x: '+x[i]+'. Actual: '+actual+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
	}
	t.end();
});

tape( 'the function evaluates the `atan2d` function (when x is negative and y is positive)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	y = negativePositive.y;
	x = negativePositive.x;
	expected = negativePositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = atan2d( y[i], x[i] );
		delta = abs( actual - expected[i] );
		tol = 2.3 * EPS * abs( expected[i] );
		t.equal( delta <= tol, true, 'within tolerance. y: '+y[i]+'. x: '+x[i]+'. Actual: '+actual+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
	}
	t.end();
});

tape( 'the function evaluates the `atan2d` function (when x and y are negative)', function test( t ) {
	var expected;
	var actual;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	y = negativeNegative.y;
	x = negativeNegative.x;
	expected = negativeNegative.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = atan2d( y[i], x[i] );
		delta = abs( actual - expected[i] );
		tol = 2.0 * EPS * abs( expected[i] );
		t.equal( delta <= tol, true, 'within tolerance. y: '+y[i]+'. x: '+x[i]+'. Actual: '+actual+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
	}
	t.end();
});
