import { render } from './../rendering';
import createElement from './../../core/createElement';

describe('SVG (non-jsx)', () => {
	let container;

	beforeEach(() => {
		container = document.createElement('div');
	});

	afterEach(() => {
		render(null, container);
	});

	it('should set "class" attribute', () => {

		const template = (val1) =>
			createElement('svg', { height: val1 });

		render(template(null), container);
		render(template(200), container);
		expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
		expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('height')).to.eql('200');
		render(template(null), container);
		render(template(200), container);
		expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
		expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('height')).to.eql('200');

	});

	it('should respect SVG namespace and render SVG attributes', () => {
		let template;

		template = (val1) =>
			createElement('svg', {
				xmlns: 'http://www.w3.org/2000/svg',
				version: '1.1',
				baseProfile: 'full',
				width: '200',
				height: val1
			}, null);

		render(template(200), container);
		expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
		expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('xmlns')).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('version')).to.eql('1.1');
		expect(container.firstChild.getAttribute('baseProfile')).to.eql('full');
		expect(container.firstChild.getAttribute('width')).to.eql('200');

		render(template(null), container);

		template = () =>
			createElement('svg', { width: 200 }, null);
		render(template(), container);

		expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
		expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('width')).to.eql('200');

		render(template(), container);

		expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
		expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('width')).to.eql('200');
	});

	it('should set SVG as default namespace for <svg>', () => {
		let template;

		template = () => ({
			dom: null,
			tag: 'svg'
		});

		render(template(), container);
		expect(container.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
		render(template(null), container);

		template = () => ({
			dom: null,
			tag: 'svg',
			children: {
				dom: null,
				tag: 'path'
			}
		});

		render(template(), container);
		expect(container.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
	});

	it('should unset a namespaced attributes', () => {

		let template = (val) => ({
			dom: null,
			tag: 'image',
			attrs: {
				xmlns: 'http://www.w3.org/2000/svg',
				'xlink:href': val
			}
		});

		render(template(null), container);
		render(template('test.jpg'), container);
		expect(container.firstChild.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).to.equal('test.jpg');

		render(template(null), container);
		expect(container.firstChild.hasAttributeNS('http://www.w3.org/1999/xlink', 'href')).to.equal(false);
	});

	it('should unset a namespaced attributes', () => {

		let template = (val) => ({
			dom: null,
			tag: 'image',
			attrs: {
				xmlns: 'http://www.w3.org/2000/svg',
				'xlink:href': val
			}
		});

		render(template(null), container);
		expect(container.firstChild.hasAttributeNS('http://www.w3.org/1999/xlink', 'href')).to.equal(false);

		render(template(null), container);
		expect(container.firstChild.hasAttributeNS('http://www.w3.org/1999/xlink', 'href')).to.equal(false);
	});

	it('should unset a namespaced attributes', () => {

		let template = (val) => ({
			dom: null,
			tag: 'image',
			attrs: {
				xmlns: 'http://www.w3.org/2000/svg',
				'xlink:href': val
			}
		});

		render(template(null), container);
		expect(container.firstChild.hasAttributeNS('http://www.w3.org/1999/xlink', 'href')).to.equal(false);

		render(template('test.jpg'), container);
		expect(container.firstChild.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).to.equal('test.jpg');
	});

	it('should use the parent namespace by default (static)', () => {

		let template;

		template = () => ({
			dom: null,
			tag: 'svg',
			children: {
				dom: null,
				tag: 'circle'
			}
		});

		render(template(), container);
		expect(container.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		render(template(), container);
		expect(container.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		template = () => ({
			dom: null,
			tag: 'svg',
			children: {
				dom: null,
				tag: 'path',
				children: null
			}
		});

		render(template(), container);
		expect(container.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		template = () => ({
			dom: null,
			tag: 'svg',
			children: null
		});

		render(template(), container);
		expect(container.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
	});

	it('should handle SVG edge case (static)', () => {

		let template = (child) => ({
			dom: null,
			tag: 'div',
			children: {
				dom: null,
				tag: 'svg'
			}
		});

		render(template(), container);
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
		render(template(), container);
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

	});

	it('should keep parent namespace (dynamic)', () => {

		let child,
			template = (child) => ({
				dom: null,
				tag: 'svg',
				attrs: {
					xmlns: 'http://www.w3.org/2000/svg'
				},
				children: child
			});

		child = () => ({
			dom: null,
			tag: 'circle'
		});

		render(template(child()), container);
		expect(container.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		render(template(null), container);

		child = () => ({
			dom: null,
			tag: 'circle',
			attrs: {
				xmlns: 'http://www.w3.org/2000/svg'
			},
			children: {
				dom: null,
				tag: 'circle',
				attrs: {
					xmlns: 'http://www.w3.org/2000/svg'
				}
			}
		});

		render(template(child()), container);
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		render(template(null), container);

		child = () => ({
			dom: null,
			tag: 'circle',
			children: {
				dom: null,
				tag: 'circle',
				children: {
					dom: null,
					tag: 'g',
					attrs: {
						xmlns: 'http://www.w3.org/2000/svg'
					}
				}
			}
		});

		render(template(child()), container);
		expect(container.firstChild.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		child = () => ({
			dom: null,
			tag: 'circle',
			children: {
				dom: null,
				tag: 'circle',
				children: {
					dom: null,
					tag: 'g',
					children: {
						dom: null,
						tag: 'g'
					}
				}
			}
		});

		render(template(child()), container);
		expect(container.firstChild.firstChild.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		child = () => ({
			dom: null,
			tag: 'circle',
			children: {
				dom: null,
				tag: 'circle',
				children: {
					dom: null,
					tag: 'g',
					children: {
						dom: null,
						tag: 'g',
						children: {
							dom: null,
							tag: 'circle'
						}

					}
				}

			}
		});

		render(template(null), container);
		render(template(child()), container);
		expect(container.firstChild.firstChild.firstChild.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
		render(template(null), container);
		render(template(child()), container);
		expect(container.firstChild.firstChild.firstChild.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
	});

	it('should set class attribute', () => {

		const template = (val) => ({
			dom: null,
			tag: 'image',
			attrs: {
				class: val
			}
		});

		render(template('foo'), container);
		expect(container.firstChild.getAttribute('class')).to.equal('foo');
		render(template(null), container);

		render(template('bar'), container);
		expect(container.firstChild.getAttribute('class')).to.equal('bar');

		render(template(['bar']), container);
		expect(container.firstChild.getAttribute('class')).to.equal('bar');

		render(template([ 'bar', 'zoo' ]), container);
		expect(container.firstChild.getAttribute('class')).to.equal('bar,zoo');

		// TODO! Fix this
		// render(template([ 'bar', null, 'zoo' ]), container);
		// expect(container.firstChild.getAttribute('class')).to.equal('bar,zoo');

	});

	it('should respect SVG namespace and render SVG attributes', () => {

		const template = (val1, val2) => ({
			dom: null,
			tag: 'svg',
			attrs: {
				xmlns: 'http://www.w3.org/2000/svg',
				version: '1.1',
				baseProfile: 'full',
				width: val1,
				height: val2
			}
		});

		render(template(200, 200), container);

		expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
		expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('xmlns')).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('version')).to.eql('1.1');
		expect(container.firstChild.getAttribute('baseProfile')).to.eql('full');
		expect(container.firstChild.getAttribute('width')).to.eql('200');
		expect(container.firstChild.getAttribute('height')).to.eql('200');

		render(template(300, 300), container);

		expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
		expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('xmlns')).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('version')).to.eql('1.1');
		expect(container.firstChild.getAttribute('baseProfile')).to.eql('full');
		expect(container.firstChild.getAttribute('width')).to.eql('300');
		expect(container.firstChild.getAttribute('height')).to.eql('300');
	});

	it('should set "viewBox" attribute', () => {

		const template = () => ({
			dom: null,
			tag: 'svg',
			attrs: {
				xmlns: 'http://www.w3.org/2000/svg',
				viewBox: '0 0 50 20'
			}
		});

		render(template(), container);

		expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
		expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('xmlns')).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('viewBox')).to.eql('0 0 50 20');

		render(template(), container);

		expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
		expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('xmlns')).to.eql('http://www.w3.org/2000/svg');
		expect(container.firstChild.getAttribute('viewBox')).to.eql('0 0 50 20');
	});

	it('should solve SVG edge when wrapped inside a non-namespace element (static)', () => {

		let template = () => ({
			dom: null,
			tag: 'div',
			children: {
				dom: null,
				tag: 'svg'
			}
		});

		render(template(), container);

		// expect(container.firstChild.firstChild.tagName).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

	});

	it('should solve SVG edge case with XMLNS attribute when wrapped inside a non-namespace element (static)', () => {

		let template = () => ({
			dom: null,
			tag: 'div',
			attrs: {
				xmlns: 'http://www.w3.org/2000/svg'
			},
			children: {
				dom: null,
				tag: 'svg'
			}
		});

		render(template(), container);

		// expect(container.firstChild.firstChild.tagName).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

	});

	it('should solve SVG edge when wrapped inside a non-namespace element (static)', () => {

		let template = () => ({
			dom: null,
			tag: 'div',
			children: {
				dom: null,
				attrs: {
					xmlns: 'http://www.w3.org/2000/svg'
				},
				tag: 'svg'
			}
		});

		render(template(), container);
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
		render(template(), container);
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
	});
});
